<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Operation>
 */
class OperationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(rand(2, 5), true),
            'description' => fake()->paragraph(),
            'amount' => fake()->numberBetween(1, 1000000),
            'type' => fake()->randomElement(['income', 'outcome']),
            'created_at' => now(),
            'category_id' => fake()->numberBetween(1, 50),
        ];
    }
}
