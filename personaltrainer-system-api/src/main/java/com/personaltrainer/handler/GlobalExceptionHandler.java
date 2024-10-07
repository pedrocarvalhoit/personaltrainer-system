package com.personaltrainer.handler;

import com.personaltrainer.exception.OperationNotPermitedException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OperationNotPermitedException.class)
    public ResponseEntity<String> handlePermitionCheck(OperationNotPermitedException ex){
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(ex.getMessage());
    }

    //Example of more complete exception control

//    @ExceptionHandler(DisabledException.class)
//    public ResponseEntity<ExceptionResponse> handleException(DisabledException exp) {
//        return ResponseEntity
//                .status(UNAUTHORIZED)
//                .body(
//                        ExceptionResponse.builder()
//                                .businessErrorCode(ACCOUNT_DISABLED.getCode())
//                                .businessErrorDescription(ACCOUNT_DISABLED.getDescription())
//                                .error(exp.getMessage())
//                                .build()
//                );
//    }

}
