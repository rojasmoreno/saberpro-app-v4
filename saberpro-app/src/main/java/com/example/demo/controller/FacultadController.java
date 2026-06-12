package com.example.demo.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Facultad;
import com.example.demo.repository.FacultadRepository;

@RestController
@RequestMapping("/api/facultades")
@CrossOrigin(origins = "*")
public class FacultadController {

    @Autowired
    private FacultadRepository facultadRepository;

    @GetMapping
    public List<Facultad> listar() {
        return facultadRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facultad> obtener(@PathVariable Long id) {
        return facultadRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Facultad crear(@RequestBody Facultad facultad) {
        return facultadRepository.save(facultad);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facultad> actualizar(@PathVariable Long id, @RequestBody Facultad datos) {
        return facultadRepository.findById(id).map(f -> {
            f.setNombre(datos.getNombre());
            return ResponseEntity.ok(facultadRepository.save(f));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        facultadRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}