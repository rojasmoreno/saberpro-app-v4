package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Facultad;

public interface FacultadRepository extends JpaRepository<Facultad, Long> {
}