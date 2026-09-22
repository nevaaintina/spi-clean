<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Milestone;
use App\Models\TeamMember;
use App\Models\Customer;
use App\Models\Branch;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('About/Index', [
            'milestones' => Milestone::orderBy('year', 'asc')->get(),
            'managementTeam' => TeamMember::where('category', 'management')->get(),
            'operationalTeam' => TeamMember::where('category', 'operational')->get(),
            'customers' => Customer::all(),
            'branches' => Branch::all(), // Untuk peta interaktif pelanggan
        ]);
    }
}