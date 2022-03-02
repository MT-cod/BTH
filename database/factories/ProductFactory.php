<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * @throws \Exception
     */
    public function definition()
    {
        $statuses = ["available", "unavailable"];
        shuffle($statuses);
        return [
            'article' => $this->faker->words(1, true) . random_int(10000, 1000000),
            'name' => $this->faker->unique()->words(2, true),
            'status' => $statuses[0],
            'data' => json_encode(['weight' => random_int(100, 1000), 'size' => random_int(100, 1000)], JSON_THROW_ON_ERROR)
        ];
    }
}
