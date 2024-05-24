package com.personaltrainer.client;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("clients")
@RequiredArgsConstructor
@Tag(name = "Client")
public class ClientController {

    private final ClientService clientService;

    //saveClient
    @PostMapping("/save")
    public ResponseEntity<Integer> saveClient(@Valid @RequestBody SaveClientRequest request, Authentication connectedUser){
        return ResponseEntity.ok(clientService.save(request, connectedUser));
    }

    //updateClient

    //deleteCLient

    //enableClient

    //disableClient



}
