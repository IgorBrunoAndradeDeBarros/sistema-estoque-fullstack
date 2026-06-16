package com.jif.estoque.service;

import com.jif.estoque.dto.AlertaCountDTO;
import com.jif.estoque.dto.AlertaDTO;
import com.jif.estoque.entity.Alerta;
import com.jif.estoque.mapper.AlertaMapper;
import com.jif.estoque.repository.AlertaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.util.List;

@ApplicationScoped
public class AlertaService {

    @Inject
    AlertaRepository alertaRepository;

    public List<AlertaDTO> listar(Boolean lido) {

        List<Alerta> alertas;

        if (lido != null) {
            alertas = alertaRepository.list("lido = ?1", lido);
        } else {
            alertas = alertaRepository.listAll();
        }

        return alertas.stream().map(AlertaMapper::toDTO).toList();
    }

    public AlertaCountDTO contarNaoLidos() {
        long total = alertaRepository.count("lido = false");
        return new AlertaCountDTO(total);
    }

    @Transactional
    public void marcarComoLido(Long id) {
        Alerta alerta = alertaRepository.findById(id);
        if (alerta == null) {
            throw new WebApplicationException(
                    Response.status(404).entity("Alerta não encontrado").build()
            );
        }
        alerta.lido = true;
    }

    @Transactional
    public void marcarTodosComoLidos() {
        alertaRepository.update("lido = true where lido = false");
    }
}