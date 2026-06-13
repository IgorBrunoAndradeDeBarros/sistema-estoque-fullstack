package com.jif.estoque.repository;

import com.jif.estoque.entity.Alerta;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AlertaRepository implements PanacheRepository<Alerta> {
}
