package com.jif.estoque.resource;

import com.jif.estoque.dto.SaldoDTO;
import com.jif.estoque.service.SaldoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/saldos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SaldoResource {

    @Inject
    SaldoService saldoService;

    @GET
    public Response listar() {
        List<SaldoDTO> saldos = saldoService.listar();
        return Response.ok(saldos).build();
    }

    @GET
    @Path("/{produtoId}")
    public Response buscarPorProdutoId(@PathParam("produtoId") Long produtoId) {
        SaldoDTO saldo = saldoService.buscarPorProdutoId(produtoId);
        return Response.ok(saldo).build();
    }
}