<?php

namespace Tests\Feature;

use App\Models\BusinessCard;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class BusinessCardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanAddBusinessCard()
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);

        $response = $this->actingAs($user)
            ->postJson('/api/business-cards/store', [
                'name' => 'John Doe',
                'company' => 'Example Inc.',
                'title' => 'Developer',
                'phone' => '1234567890',
                'email' => 'j.doe@email.com',
                'address' => '123 Main St, Springfield, IL',
                'website' => 'https://example.com',
            ]);

        $response->assertStatus(201);
        $response->assertJson(['name' => 'John Doe']);
    }
    public function testUserCanUpdateBusinessCard()
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);

        $businessCard = BusinessCard::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)
            ->putJson("/api/business-cards/{$businessCard->id}/update", [
                'name' => 'Updated Name',
                'company' => $businessCard->company,
                'title' => $businessCard->title,
                'phone' => $businessCard->phone,
                'email' => $businessCard->email,
                'address' => $businessCard->address,
                'website' => $businessCard->website,

            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('business_cards', [
            'id' => $businessCard->id,
            'name' => 'Updated Name',
        ]);
    }

    public function testUserCanDeleteBusinessCard()
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);

        $businessCard = BusinessCard::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)
            ->deleteJson("/api/business-cards/{$businessCard->id}/delete");

        $response->assertStatus(204);
    $this->assertDatabaseMissing('business_cards', ['id' => $businessCard->id]);
    }
}
