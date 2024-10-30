package com.example.springboot.game.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DropItem {
    @DocumentReference
    private Item item;
    private Double dropChance;
}
