package com.example.springboot.game.Objects;

import com.example.springboot.game.Objects.Item;
import com.example.springboot.game.Objects.Location;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "experienceRequired")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceRequired {
    @Id
    private String id;
    private String profession;
    private Integer amountRequired;
    private Integer level;
}
