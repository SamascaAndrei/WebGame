package com.example.springboot.game.Objects;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Items")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class ItemDataRequest {
    @Id
    private String id;
    private String name;

    private Integer level;

    private Integer value;
    private Integer damage;

    private String userID;

     public static Item toItem(ItemDataRequest itemDataRequest)
    {
        return new Item(itemDataRequest.getName(),itemDataRequest.getLevel(),itemDataRequest.getDamage());
    }
}
