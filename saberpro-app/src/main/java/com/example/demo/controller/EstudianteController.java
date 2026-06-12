package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Estudiante;
import com.example.demo.model.Facultad;
import com.example.demo.repository.EstudianteRepository;
import com.example.demo.repository.FacultadRepository;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "*")
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private FacultadRepository facultadRepository;

    @GetMapping
    public List<Estudiante> listar() {
        return estudianteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> obtener(@PathVariable Long id) {
        return estudianteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/documento/{numeroDocumento}")
    public ResponseEntity<Estudiante> buscarPorDocumento(@PathVariable String numeroDocumento) {
        Estudiante e = estudianteRepository.findByNumeroDocumento(numeroDocumento);
        return e != null ? ResponseEntity.ok(e) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Estudiante estudiante) {
        // Resolver la Facultad desde la BD para evitar TransientPropertyValueException
        if (estudiante.getFacultad() != null && estudiante.getFacultad().getId() != null) {
            Facultad facultad = facultadRepository.findById(estudiante.getFacultad().getId())
                    .orElse(null);
            if (facultad == null) {
                return ResponseEntity.badRequest().body("Facultad no encontrada con ID: " + estudiante.getFacultad().getId());
            }
            estudiante.setFacultad(facultad);
        }
        return ResponseEntity.ok(estudianteRepository.save(estudiante));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> actualizar(@PathVariable Long id, @RequestBody Estudiante datos) {
        return estudianteRepository.findById(id).map(e -> {
            e.setPrimerNombre(datos.getPrimerNombre());
            e.setSegundoNombre(datos.getSegundoNombre());
            e.setPrimerApellido(datos.getPrimerApellido());
            e.setSegundoApellido(datos.getSegundoApellido());
            e.setCorreo(datos.getCorreo());
            e.setTelefono(datos.getTelefono());
            if (datos.getFacultad() != null && datos.getFacultad().getId() != null) {
                facultadRepository.findById(datos.getFacultad().getId())
                        .ifPresent(e::setFacultad);
            }
            return ResponseEntity.ok(estudianteRepository.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        estudianteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/cargar-pago")
    public ResponseEntity<Estudiante> cargarPago(@PathVariable Long id) {
        return estudianteRepository.findById(id).map(e -> {
            e.setPagoCargado(true);
            return ResponseEntity.ok(estudianteRepository.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/aprobar")
    public ResponseEntity<Estudiante> aprobar(@PathVariable Long id) {
        return estudianteRepository.findById(id).map(e -> {
            e.setAprobado(true);
            return ResponseEntity.ok(estudianteRepository.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }
}