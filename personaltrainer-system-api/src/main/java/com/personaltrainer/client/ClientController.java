package com.personaltrainer.client;

import com.personaltrainer.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("clients")
@RequiredArgsConstructor
@Tag(name = "Client")
public class ClientController {

    private final ClientService clientService;
    
    //saveClient
    @PostMapping(value = "/save", consumes = "multipart/form-data")
    public ResponseEntity<Integer> saveClient(@RequestPart("client") ClientSaveRequest request,
                                              Authentication connectedUser,
                                              @RequestPart("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(clientService.save(request, connectedUser, file));
    }

    //update Photo
    @PatchMapping("/update-photo/{clientId}")
    public ResponseEntity<String> updatePhoto(Authentication authentication,
                                               @RequestPart ("file") MultipartFile file,
                                               @PathVariable Integer clientId) throws IOException {
        return ResponseEntity.ok(clientService.updatePhoto(authentication, clientId, file));
    }

    //findById
    @GetMapping("{clientId}")
    public ResponseEntity<ClientReponse> findById(@PathVariable Integer clientId){

        return ResponseEntity.ok(clientService.findById(clientId));
    }

    //findAllEnabled
    @GetMapping("/all-enabled")
    public ResponseEntity<PageResponse<ClientReponse>> findAllClients(
            @RequestParam(name = "page", defaultValue = "0", required = false)int page,
            @RequestParam(name = "size", defaultValue = "50", required = false) int size, Authentication connectedUser){

        return ResponseEntity.ok(clientService.findAllEnabledClients(page, size, connectedUser));
    }

    //findAllDisabled
    @GetMapping("/all-disabled")
    public ResponseEntity<PageResponse<ClientReponse>> findAllDisabledClients(
            @RequestParam(name = "page", defaultValue = "0", required = false)int page,
            @RequestParam(name = "size", defaultValue = "50", required = false) int size, Authentication connectedUser){

        return ResponseEntity.ok(clientService.findAllDisabledClients(page, size, connectedUser));
    }

    //deleteClient
    @DeleteMapping("/delete/{clientId}")
    public ResponseEntity<Integer> deleteClient(@PathVariable Integer clientId, Authentication connectedUser){
        return ResponseEntity.ok(clientService.deleteClientAndSessions(clientId, connectedUser));
    }

    //update PersonalData (Email and Mobile)
    @PatchMapping("/update/{clientId}")
    public ResponseEntity<Integer> updatePersonalData(@PathVariable Integer clientId,
                                                      Authentication authentication,
                                                      @Valid @RequestBody ClientUpdateRequest request){
        return ResponseEntity.ok(clientService.updatePersonalData(clientId, authentication, request));
    }

    //updateStatus
    @PatchMapping("/update-status/{clientId}")
    public ResponseEntity<Integer> enableClient(@PathVariable Integer clientId, Authentication authenticatedUser){
        return ResponseEntity.ok(clientService.updateStatus(clientId, authenticatedUser));
    }


}
