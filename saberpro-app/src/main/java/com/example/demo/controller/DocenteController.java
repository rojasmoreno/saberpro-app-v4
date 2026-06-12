package com.example.demo.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Docente;
import com.example.demo.model.Facultad;
import com.example.demo.repository.DocenteRepository;
import com.example.demo.repository.FacultadRepository;

@RestController
@RequestMapping("/api/docentes")
@CrossOrigin(origins = "*")
public class DocenteController {

    @Autowired
    private DocenteRepository docenteRepository;

    @Autowired
    private FacultadRepository facultadRepository;

    @GetMapping
    public List<Docente> listar() {
        return docenteRepository.findAll();
    }

    @GetMapping("/cedula/{cedula}")
    public ResponseEntity<Docente> buscarPorCedula(@PathVariable String cedula) {
        Docente docente = docenteRepository.findByCedula(cedula);
        return docente != null ? ResponseEntity.ok(docente) : ResponseEntity.notFound().build();
    }

    @GetMapping("/facultad/{facultadId}")
    public List<Docente> buscarPorFacultad(@PathVariable Long facultadId) {
        return docenteRepository.findByFacultadId(facultadId);
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Docente docente) {
        if (docente.getFacultad() != null && docente.getFacultad().getId() != null) {
            Facultad facultad = facultadRepository.findById(docente.getFacultad().getId()).orElse(null);
            if (facultad == null) return ResponseEntity.badRequest().body("Facultad no encontrada");
            docente.setFacultad(facultad);
        }
        return ResponseEntity.ok(docenteRepository.save(docente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Docente> actualizar(@PathVariable Long id, @RequestBody Docente datos) {
        return docenteRepository.findById(id).map(d -> {
            d.setNombre(datos.getNombre());
            d.setCedula(datos.getCedula());
            d.setCorreo(datos.getCorreo());
            if (datos.getFacultad() != null && datos.getFacultad().getId() != null) {
                facultadRepository.findById(datos.getFacultad().getId()).ifPresent(d::setFacultad);
            }
            return ResponseEntity.ok(docenteRepository.save(d));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        docenteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}