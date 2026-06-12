package com.example.demo.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Estudiante;
import com.example.demo.model.ResultadoSaberPro;
import com.example.demo.repository.EstudianteRepository;
import com.example.demo.repository.ResultadoSaberProRepository;

@RestController
@RequestMapping("/api/resultados")
@CrossOrigin(origins = "*")
public class ResultadoController {

    @Autowired
    private ResultadoSaberProRepository resultadoRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    // Alumnos Resultados Total (listado general - Estudiante/Coordinación/Docente)
    @GetMapping
    public List<ResultadoSaberPro> listarTodos() {
        return resultadoRepository.findAll();
    }

    // Alumno Resultado Único (Dashboard de Estudiante)
    @GetMapping("/estudiante/{estudianteId}")
    public ResponseEntity<ResultadoSaberPro> obtenerPorEstudiante(@PathVariable Long estudianteId) {
        ResultadoSaberPro resultado = resultadoRepository.findByEstudianteId(estudianteId);
        return resultado != null ? ResponseEntity.ok(resultado) : ResponseEntity.notFound().build();
    }

    // Registrar / cargar resultado de un estudiante (Administrador / Coordinación)
    @PostMapping("/estudiante/{estudianteId}")
    public ResponseEntity<ResultadoSaberPro> registrar(@PathVariable Long estudianteId,
                                                         @RequestBody ResultadoSaberPro resultado) {
        return estudianteRepository.findById(estudianteId).map(estudiante -> {
            resultado.setEstudiante(estudiante);
            return ResponseEntity.ok(resultadoRepository.save(resultado));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResultadoSaberPro> actualizar(@PathVariable Long id, @RequestBody ResultadoSaberPro datos) {
        return resultadoRepository.findById(id).map(r -> {
            datos.setId(r.getId());
            datos.setEstudiante(r.getEstudiante());
            return ResponseEntity.ok(resultadoRepository.save(datos));
        }).orElse(ResponseEntity.notFound().build());
    }
}