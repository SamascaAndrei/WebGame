package com.example.springboot.game.Objects;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.DocumentPointer;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private Integer gold;
    private Integer playerXP;


    private Integer hp;
    private Integer def;
    private Integer atk;
    private List<Job> jobs;

    @DocumentReference
    private List<Item> items;

    @DocumentReference
    private Location currentLocation;


    public User(String username, String password)
    {
        this.username=username;
        this.password=password;
        hp=100;
        gold=10;
        atk=1;
        def=1;
        playerXP=0;
        Job mining=new Job("mining",0);
        Job fishing=new Job("fishing",0);
        Job combat=new Job("combat",0);
        Job farming=new Job("farming",0);
        Job lumbering=new Job("lumbering",0);
        Job crafting=new Job("crafting",0);
        this.items=new ArrayList<Item>();
        this.jobs=new ArrayList<Job>();
        jobs.add(mining);
        jobs.add(fishing);
        jobs.add(combat);
        jobs.add(farming);
        jobs.add(lumbering);
        jobs.add(crafting);
    }

}
