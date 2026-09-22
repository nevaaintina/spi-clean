<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use Illuminate\Http\Request;

class JobVacancyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'department'  => 'required|string|max:255',
            'location'    => 'required|string|max:255',
            'education'   => 'required|string|max:255',
            'job_type'    => 'required|string|max:50',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'description' => 'nullable|string',
            'requirements'=> 'nullable|string',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $file->move(public_path('job_vacancies'), $filename);
            $imagePath = 'job_vacancies/' . $filename;
        }

        JobVacancy::create([
            'title'        => $request->input('title'),
            'department'   => $request->input('department'),
            'location'     => $request->input('location'),
            'education'    => $request->input('education'),
            'job_type'     => $request->input('job_type'),
            'image'        => $imagePath,
            'description'  => $request->input('description'),
            'requirements' => $request->input('requirements'),
        ]);

        return redirect()->back()->with('success', 'Lowongan pekerjaan berhasil ditambahkan!');
    }

    public function destroy(JobVacancy $jobVacancy)
    {
        if ($jobVacancy->image && file_exists(public_path($jobVacancy->image))) {
            @unlink(public_path($jobVacancy->image));
        }

        $jobVacancy->delete();

        return redirect()->back()->with('success', 'Lowongan pekerjaan berhasil dihapus!');
    }
}