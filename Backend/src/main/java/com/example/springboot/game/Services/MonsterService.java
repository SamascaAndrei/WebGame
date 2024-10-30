package com.example.springboot.game.Services;

import com.example.springboot.game.Objects.DropItem;
import com.example.springboot.game.Objects.Item;
import com.example.springboot.game.Objects.Monster;
import com.example.springboot.game.Objects.User;
import com.example.springboot.game.Repositories.ItemRepository;
import com.example.springboot.game.Repositories.LocationRepository;
import com.example.springboot.game.Repositories.MonsterRepository;
import com.example.springboot.game.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MonsterService {


    private static MonsterService instance=null;

    public static synchronized MonsterService getInstance()
    {
        if (instance == null)
            instance = new MonsterService();

        return instance;
    }

    @Autowired
    MonsterRepository repository;


    public List<Monster> findAllMonsters() {
        return repository.findAll();
    }

    @Transactional
    public Monster updateMonster(Monster monster, String id) {
        Monster updatedMonster = repository.findById(id).orElseThrow(RuntimeException::new);
        monster.setId(id);
        repository.save(monster);
        return monster;
    }

    public void deleteMonster(String id) {
        Monster deletedMonster = repository.findById(id).orElseThrow(RuntimeException::new);
        repository.delete(deletedMonster);
    }

    public Monster insertMonster(Monster monster) {
        return repository.insert(monster);
    }
}