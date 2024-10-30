package com.example.springboot.game.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShopItem {
    @Id
    private String id;
    @DocumentReference
    private Item item;
    private Integer gold;
}
