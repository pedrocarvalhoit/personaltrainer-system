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

@RestController
@RequestMapping("clients")
@RequiredArgsConstructor
@Tag(name = "Client")
public class ClientController {

    private final ClientService clientService;

    //saveClient
    @PostMapping("/save")
    public ResponseEntity<Integer> saveClient(@Valid @RequestBody ClientSaveRequest request, Authentication connectedUser){
        return ResponseEntity.ok(clientService.save(request, connectedUser));
    }

    //deleteClient
    @DeleteMapping("/delete/{clientId}")
    public ResponseEntity<Integer> deleteClient(@PathVariable Integer clientId, Authentication connectedUser){
        return ResponseEntity.ok(clientService.delete(clientId, connectedUser));
    }

    //update PersonalData (Email and Mobile)
    @PatchMapping("/update-personal-data/{clientId}")
    public ResponseEntity<Integer> updatePersonalData(@PathVariable Integer clientId,
                                                      Authentication authentication,
                                                      @Valid @RequestBody ClientUpdateRequest request){
        return ResponseEntity.ok(clientService.updatePersonalData(clientId, authentication, request));
    }

    //findById
    @GetMapping("{clientId}")
    public ResponseEntity<ClientReponse> findById(@PathVariable Integer clientId){

        return ResponseEntity.ok(clientService.findById(clientId));
    }

    //findAll
    @GetMapping("/all-enabled")
    public ResponseEntity<PageResponse<ClientReponse>> findAllClients(
            @RequestParam(name = "page", defaultValue = "0", required = false)int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size, Authentication connectedUser){

        return ResponseEntity.ok(clientService.findAllEnabledClients(page, size, connectedUser));
    }

    //updateStatus
    @PatchMapping("/update-status/{clientId}")
    public ResponseEntity<Integer> enableClient(@PathVariable Integer clientId, Authentication authenticatedUser){
        return ResponseEntity.ok(clientService.updateStatus(clientId, authenticatedUser));
    }

    //photoUpload
    @PostMapping(value = "/photo/{clientId}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadProfilePicture(@PathVariable Integer clientId,
                                                  @Parameter()
                                                  @RequestPart("file")MultipartFile file,
                                                  Authentication connectedUser){
        clientService.uploadProfilePicture(file, connectedUser, clientId);
        return ResponseEntity.ok().build();
    }


}
