package com.example.springboot.game.Controllers;

import com.example.springboot.game.Services.ItemService;

public class MonsterController {
    private static MonsterController instance=null;

    public static synchronized MonsterController getInstance()
    {
        if (instance == null)
            instance = new MonsterController();

        return instance;
    }
}
