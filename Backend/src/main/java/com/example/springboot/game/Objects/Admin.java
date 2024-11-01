package com.example.springboot.game.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admins")
@Data

@NoArgsConstructor
public class Admin {

    @Id
    private String  id;
    private String username;
    private String password;

    public Admin(String id,String username,String password)
    {
        this.id=id;
        this.username=username;
        this.password=password;
    }

}
