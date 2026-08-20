<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\ComplianceController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\DealerDashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

// Public Catalog & Sourcing Engine
Route::get('/', [VehicleController::class, 'index'])->name('vehicles.index');
Route::get('/vehicles/{id}', [VehicleController::class, 'show'])->name('vehicles.show');

// Deals & Procurement Pipeline
Route::get('/deals', [DealController::class, 'index'])->name('deals.index');
Route::post('/deals', [DealController::class, 'store'])->name('deals.store');
Route::get('/deals/{id}', [DealController::class, 'show'])->name('deals.show');
Route::post('/deals/{id}/status', [DealController::class, 'updateStatus'])->name('deals.updateStatus');
Route::get('/deals/{id}/invoice', [DealController::class, 'downloadInvoice'])->name('deals.invoice');

// Automated Compliance & Docs
Route::post('/compliance/{id}/verify', [ComplianceController::class, 'verify'])->name('compliance.verify');
Route::post('/compliance/{id}/upload', [ComplianceController::class, 'upload'])->name('compliance.upload');

// Broker Admin Control Panel
Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

// Dealer Partner Dashboard & Inventory Manager
Route::get('/dealer', [DealerDashboardController::class, 'index'])->name('dealer.dashboard');
Route::get('/dealer/vehicles/create', [DealerDashboardController::class, 'createVehicle'])->name('dealer.vehicles.create');
Route::post('/dealer/vehicles', [DealerDashboardController::class, 'storeVehicle'])->name('dealer.vehicles.store');
Route::get('/dealer/vehicles/{id}/edit', [DealerDashboardController::class, 'editVehicle'])->name('dealer.vehicles.edit');
Route::post('/dealer/vehicles/{id}', [DealerDashboardController::class, 'updateVehicle'])->name('dealer.vehicles.update');
Route::post('/dealer/vehicles/{id}/status', [DealerDashboardController::class, 'toggleVehicleStatus'])->name('dealer.vehicles.toggleStatus');
Route::post('/dealer/vehicles/{id}/update-price', [DealerDashboardController::class, 'updateVehiclePrice'])->name('dealer.vehicles.updatePrice');
Route::get('/dealer/settings', [DealerDashboardController::class, 'settings'])->name('dealer.settings');
Route::post('/dealer/settings', [DealerDashboardController::class, 'updateSettings'])->name('dealer.settings.update');
Route::get('/dealer/services', [DealerDashboardController::class, 'services'])->name('dealer.services');
Route::get('/dealer/fleet-analytics', [DealerDashboardController::class, 'fleetAnalytics'])->name('dealer.fleetAnalytics');

use App\Http\Controllers\ContactController;

// Dynamic Pages (FAQ, Privacy, Terms, Cookies, About, Contact)
Route::get('/faq', [PageController::class, 'faq'])->name('pages.faq');
Route::get('/privacy-policy', [PageController::class, 'privacyPolicy'])->name('pages.privacy');
Route::get('/terms-and-conditions', [PageController::class, 'termsAndConditions'])->name('pages.terms');
Route::get('/cookie-policy', [PageController::class, 'cookiePolicy'])->name('pages.cookies');
Route::get('/about', [PageController::class, 'about'])->name('pages.about');
Route::get('/contact', [ContactController::class, 'index'])->name('pages.contact');
Route::post('/contact', [ContactController::class, 'submit'])->name('pages.contact.submit');

use App\Http\Controllers\Auth\PasswordResetController;

// Authentication & Password Reset Routes
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/forgot-password', [PasswordResetController::class, 'createForgotPassword'])->name('password.request');
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink'])->name('password.email');
Route::get('/reset-password/{token}', [PasswordResetController::class, 'createResetPassword'])->name('password.reset');
Route::post('/reset-password', [PasswordResetController::class, 'storeResetPassword'])->name('password.update');

// Demo Multi-Role Persona Switcher
Route::post('/auth/switch-role', [AuthController::class, 'switchRole'])->name('auth.switchRole');
