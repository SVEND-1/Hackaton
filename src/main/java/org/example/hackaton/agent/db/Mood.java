package org.example.hackaton.agent.db;

public enum Mood {
    HAPPY("😊"), EXCITED("🤩"), NEUTRAL("😐"),
    SAD("😢"), ANGRY("😠"), TIRED("😴"), THOUGHTFUL("🤔");

    public final String emoji;
    Mood(String emoji) { this.emoji = emoji; }
    public String getEmoji(){
        return emoji;
    }
}
