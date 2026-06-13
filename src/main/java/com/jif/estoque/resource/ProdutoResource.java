package com.jif.estoque.resource;

import com.jif.estoque.dto.ProdutoDTO;
import com.jif.estoque.dto.ProdutoSaldoDTO;
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

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        ProdutoDTO produto = produtoService.buscarPorId(id);
        return Response.ok(produto).build();
    }

    @POST
    public Response cadastrar(ProdutoDTO dto) {
        ProdutoDTO produto = produtoService.cadastrar(dto);
        return Response.status(201).entity(produto).build();
    }

    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, ProdutoDTO dto) {
        ProdutoDTO produto = produtoService.atualizar(id, dto);
        return Response.ok(produto).build();
    }

    @DELETE
    @Path("/{id}")
    public Response desativar(@PathParam("id") Long id) {
        produtoService.desativar(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/criticos")
    public Response listarCriticos() {
        List<ProdutoSaldoDTO> produtos = produtoService.listarCriticos();
        return Response.ok(produtos).build();
    }

}
