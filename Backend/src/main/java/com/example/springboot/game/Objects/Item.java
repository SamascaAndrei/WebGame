package com.example.springboot.game.Objects;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "Items")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Item {
    @Id
    private String  id;
    private String name;

    private Integer level;

    private Integer damage;

    private String image;

    private boolean resource;

    private Integer amount;


    public Item(String name,Integer level,Integer damage)
    {
        this.name=name;
        this.level=level;
        this.damage=damage;
    }
}
