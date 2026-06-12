package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Estudiante;
import com.example.demo.model.ResultadoSaberPro;
import com.example.demo.repository.EstudianteRepository;
import com.example.demo.repository.ResultadoSaberProRepository;

@RestController
@RequestMapping("/api/informes")
@CrossOrigin(origins = "*")
public class InformeController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private ResultadoSaberProRepository resultadoRepository;

    // Informe de Alumnos Total (todos los estudiantes inscritos)
    @GetMapping("/alumnos/total")
    public List<Estudiante> informeAlumnosTotal() {
        return estudianteRepository.findAll();
    }

    // Informe de Alumnos Único (solo alumnos aprobados/únicos)
    @GetMapping("/alumnos/unico")
    public List<Estudiante> informeAlumnosUnico() {
        return estudianteRepository.findAll().stream()
                .filter(Estudiante::isAprobado)
                .collect(Collectors.toList());
    }

    // Informe de Beneficios: Resolución Beneficios Tecnología e Ingeniería
    // Regla de ejemplo: Nivel 4 en Saber Pro => aplica a beneficio
    @GetMapping("/beneficios")
    public List<Map<String, Object>> informeBeneficios() {
        List<ResultadoSaberPro> resultados = resultadoRepository.findAll();

        return resultados.stream()
                .filter(r -> "Nivel 4".equalsIgnoreCase(r.getNivelSaberPro()))
                .map(r -> {
                    Map<String, Object> item = new HashMap<>();
                    Estudiante e = r.getEstudiante();
                    item.put("estudianteId", e.getId());
                    item.put("nombre", e.getPrimerNombre() + " " + e.getPrimerApellido());
                    item.put("facultad", e.getFacultad() != null ? e.getFacultad().getNombre() : null);
                    item.put("puntaje", r.getPuntaje());
                    item.put("nivelSaberPro", r.getNivelSaberPro());
                    item.put("beneficio", "Resolución Beneficios Tecnología e Ingeniería");
                    return item;
                })
                .collect(Collectors.toList());
    }

    // ===== Informe Detallado: Estudiante + su Resultado completo (Slide 8/9) =====
    @GetMapping("/alumnos/detallado/{estudianteId}")
    public ResponseEntity<Map<String, Object>> informeDetallado(@PathVariable Long estudianteId) {
        return estudianteRepository.findById(estudianteId).map(e -> {
            Map<String, Object> data = new HashMap<>();
            data.put("id", e.getId());
            data.put("tipoDocumento", e.getTipoDocumento());
            data.put("numeroDocumento", e.getNumeroDocumento());
            data.put("nombreCompleto", e.getPrimerNombre() + " " +
                    (e.getSegundoNombre() != null ? e.getSegundoNombre() + " " : "") +
                    e.getPrimerApellido() + " " +
                    (e.getSegundoApellido() != null ? e.getSegundoApellido() : ""));
            data.put("correo", e.getCorreo());
            data.put("telefono", e.getTelefono());
            data.put("numeroRegistro", e.getNumeroRegistro());
            data.put("facultad", e.getFacultad() != null ? e.getFacultad().getNombre() : null);
            data.put("pagoCargado", e.isPagoCargado());
            data.put("aprobado", e.isAprobado());

            ResultadoSaberPro r = resultadoRepository.findByEstudianteId(e.getId());
            data.put("resultado", r); // null si aún no tiene resultado cargado

            return ResponseEntity.ok(data);
        }).orElse(ResponseEntity.notFound().build());
    }

    // ===== Informe General: lista de todos los estudiantes con su resultado (Slide 7) =====
    @GetMapping("/general")
    public List<Map<String, Object>> informeGeneral() {
        return estudianteRepository.findAll().stream().map(e -> {
            Map<String, Object> data = new HashMap<>();
            data.put("id", e.getId());
            data.put("numeroDocumento", e.getNumeroDocumento());
            data.put("nombreCompleto", e.getPrimerNombre() + " " + e.getPrimerApellido());
            data.put("facultad", e.getFacultad() != null ? e.getFacultad().getNombre() : null);
            data.put("aprobado", e.isAprobado());
            data.put("pagoCargado", e.isPagoCargado());

            ResultadoSaberPro r = resultadoRepository.findByEstudianteId(e.getId());
            data.put("puntaje", r != null ? r.getPuntaje() : null);
            data.put("nivelSaberPro", r != null ? r.getNivelSaberPro() : null);
            return data;
        }).collect(Collectors.toList());
    }

    // ===== Dashboard Administrador / Coordinador: resumen y estadísticas (Slide 3/4) =====
    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        List<Estudiante> estudiantes = estudianteRepository.findAll();
        List<ResultadoSaberPro> resultados = resultadoRepository.findAll();

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalEstudiantes", estudiantes.size());
        dashboard.put("totalAprobados", estudiantes.stream().filter(Estudiante::isAprobado).count());
        dashboard.put("totalPendientes", estudiantes.stream().filter(e -> !e.isAprobado()).count());
        dashboard.put("totalPagosCargados", estudiantes.stream().filter(Estudiante::isPagoCargado).count());
        dashboard.put("totalResultadosCargados", resultados.size());

        // Conteo de estudiantes por facultad
        Map<String, Long> porFacultad = estudiantes.stream()
                .filter(e -> e.getFacultad() != null)
                .collect(Collectors.groupingBy(e -> e.getFacultad().getNombre(), Collectors.counting()));
        dashboard.put("estudiantesPorFacultad", porFacultad);

        // Conteo por nivel Saber Pro (Nivel 1, 2, 3, 4)
        Map<String, Long> porNivel = resultados.stream()
                .filter(r -> r.getNivelSaberPro() != null)
                .collect(Collectors.groupingBy(ResultadoSaberPro::getNivelSaberPro, Collectors.counting()));
        dashboard.put("estudiantesPorNivel", porNivel);

        // Promedio general de puntaje
        double promedio = resultados.stream()
                .filter(r -> r.getPuntaje() != null)
                .mapToInt(ResultadoSaberPro::getPuntaje)
                .average()
                .orElse(0.0);
        dashboard.put("promedioPuntaje", promedio);

        return dashboard;
    }

}