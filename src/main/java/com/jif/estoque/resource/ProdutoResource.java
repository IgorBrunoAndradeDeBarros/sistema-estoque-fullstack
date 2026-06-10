package com.jif.estoque.resource;

import com.jif.estoque.dto.ProdutoDTO;
import com.jif.estoque.service.ProdutoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/produtos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProdutoResource {

    @Inject
    ProdutoService produtoService;

    @GET
    public Response listar(
        @QueryParam("nome") String nome,
        @QueryParam("ativo") Boolean ativo,
        @QueryParam("categoria") String categoria) {

        List<ProdutoDTO> produtos = produtoService.listar(nome, ativo, categoria);
        return Response.ok(produtos).build();
    }
}
