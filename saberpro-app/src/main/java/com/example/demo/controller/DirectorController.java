package com.example.demo.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Director;
import com.example.demo.model.Facultad;
import com.example.demo.repository.DirectorRepository;
import com.example.demo.repository.FacultadRepository;

@RestController
@RequestMapping("/api/directores")
@CrossOrigin(origins = "*")
public class DirectorController {

    @Autowired
    private DirectorRepository directorRepository;

    @Autowired
    private FacultadRepository facultadRepository;

    @GetMapping
    public List<Director> listar() {
        return directorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Director> obtener(@PathVariable Long id) {
        return directorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Director director) {
        if (director.getFacultad() != null && director.getFacultad().getId() != null) {
            Facultad facultad = facultadRepository.findById(director.getFacultad().getId()).orElse(null);
            if (facultad == null) return ResponseEntity.badRequest().body("Facultad no encontrada");
            director.setFacultad(facultad);
        }
        return ResponseEntity.ok(directorRepository.save(director));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Director> actualizar(@PathVariable Long id, @RequestBody Director datos) {
        return directorRepository.findById(id).map(d -> {
            d.setNombre(datos.getNombre());
            d.setCedula(datos.getCedula());
            d.setCorreo(datos.getCorreo());
            if (datos.getFacultad() != null && datos.getFacultad().getId() != null) {
                facultadRepository.findById(datos.getFacultad().getId()).ifPresent(d::setFacultad);
            }
            return ResponseEntity.ok(directorRepository.save(d));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        directorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}