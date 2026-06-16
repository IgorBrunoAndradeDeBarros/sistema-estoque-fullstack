package com.jif.estoque.repository;

import com.jif.estoque.entity.EstoqueSaldo;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EstoqueSaldoRepository implements PanacheRepository<EstoqueSaldo> {
}
