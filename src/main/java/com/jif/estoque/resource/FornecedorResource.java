package com.jif.estoque.resource;

import com.jif.estoque.dto.FornecedorDTO;
import com.jif.estoque.service.FornecedorService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/fornecedores")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FornecedorResource {

    @Inject
    FornecedorService fornecedorService;

    @GET
    public Response listar(
            @QueryParam("nome") String nome,
            @QueryParam("cnpj") String cnpj) {

        List<FornecedorDTO> fornecedores = fornecedorService.listar(nome, cnpj);
        return Response.ok(fornecedores).build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        FornecedorDTO fornecedor = fornecedorService.buscarPorId(id);
        return Response.ok(fornecedor).build();
    }

    @POST
    public Response cadastrar(FornecedorDTO dto) {
        FornecedorDTO fornecedor = fornecedorService.cadastrar(dto);
        return Response.status(201).entity(fornecedor).build();
    }
    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, FornecedorDTO dto) {
        FornecedorDTO fornecedor = fornecedorService.atualizar(id, dto);
        return Response.ok(fornecedor).build();
    }

    @DELETE
    @Path("/{id}")
    public Response desativar(@PathParam("id") Long id) {
        fornecedorService.desativar(id);
        return Response.noContent().build();
    }
}