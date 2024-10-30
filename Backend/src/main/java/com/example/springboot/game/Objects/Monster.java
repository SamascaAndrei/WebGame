package com.example.springboot.game.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "monsters")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Monster {
    @Id
    String id;
    String name;
    Integer hp;
    Integer def;
    Integer atk;
    private String image;
    List<DropItem> dropTable;
}
