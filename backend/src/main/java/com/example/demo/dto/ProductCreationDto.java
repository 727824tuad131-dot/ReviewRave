package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Built using explicit custom getters, setters, constructors, 
 * and a manual builder pattern.
 */
public class ProductCreationDto {

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    // Constructors
    public ProductCreationDto() {}

    public ProductCreationDto(String name, String category) {
        this.name = name;
        this.category = category;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    // Manual Builder Pattern Integration
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String name;
        private String category;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public ProductCreationDto build() {
            return new ProductCreationDto(this.name, this.category);
        }
    }
}