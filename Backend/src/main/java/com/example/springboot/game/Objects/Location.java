package com.example.springboot.game.Objects;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.util.Pair;

import java.util.Map;
import java.util.Set;

@Document(collection = "locations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    @Id
    private String id;
    private String name;
    private Integer level;


}
