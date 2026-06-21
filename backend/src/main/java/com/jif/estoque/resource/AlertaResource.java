package com.jif.estoque.resource;

import com.jif.estoque.dto.AlertaCountDTO;
import com.jif.estoque.dto.AlertaDTO;
import com.jif.estoque.service.AlertaService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/alertas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlertaResource {

    @Inject
    AlertaService alertaService;

    @GET
    public Response listar(@QueryParam("lido") Boolean lido) {
        List<AlertaDTO> alertas = alertaService.listar(lido);
        return Response.ok(alertas).build();
    }

    @GET
    @Path("/count")
    public Response contarNaoLidos() {
        AlertaCountDTO count = alertaService.contarNaoLidos();
        return Response.ok(count).build();
    }

    @PATCH
    @Path("/{id}/ler")
    public Response marcarComoLido(@PathParam("id") Long id) {
        alertaService.marcarComoLido(id);
        return Response.noContent().build();
    }

    @PATCH
    @Path("/ler-todos")
    public Response marcarTodosComoLidos() {
        alertaService.marcarTodosComoLidos();
        return Response.noContent().build();
    }
}