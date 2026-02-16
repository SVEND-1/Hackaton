package org.example.todolist.notify.event;

import java.util.Map;

public record NotifyEvent(
        String email,
        Map<String,String> parameters,
        NotifyType type
){
}
