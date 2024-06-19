package com.personaltrainer.client;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientReponse {

    private Integer id;
    private String fullName;
    private String email;
    private String mobile;
    private byte[] photo;
    private Integer age;
    private boolean enabled;

}
