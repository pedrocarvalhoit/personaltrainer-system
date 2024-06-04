package com.personaltrainer.common;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageResponse<T> {

    private List<T> content;
    private int pageNumber;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean first;
    private boolean last;

}
