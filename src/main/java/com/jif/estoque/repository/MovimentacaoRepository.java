package com.jif.estoque.repository;

import com.jif.estoque.entity.Movimentacao;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MovimentacaoRepository implements PanacheRepository<Movimentacao> {
}
