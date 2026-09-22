<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ArticleController extends Controller
{
    /**
     * Menyimpan artikel Knowledge / Berita baru beserta upload thumbnail dan link Instagram
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'          => 'required|string|max:255',
            'category'       => 'required|string|max:255',
            'read_time'      => 'nullable|string|max:255',
            'excerpt'        => 'nullable|string',
            'content'        => 'required|string',
            'instagram_link' => 'nullable|url|max:255',
            'thumbnail'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048',
            'is_featured'    => 'nullable|boolean',
        ]);

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $destinationPath = public_path('images/articles');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            $file->move($destinationPath, $filename);
            $thumbnailPath = 'images/articles/' . $filename;
        }

        Article::create([
            'title'          => $request->title,
            'category'       => $request->category,
            'read_time'      => $request->read_time ?? '5 Menit',
            'excerpt'        => $request->excerpt,
            'content'        => $request->content,
            'instagram_link' => $request->instagram_link,
            'thumbnail'      => $thumbnailPath,
            'is_featured'    => $request->boolean('is_featured'),
        ]);

        return redirect()->to('/admin?tab=news')->with('success', 'Artikel Knowledge berhasil ditambahkan!');
    }

    /**
     * Menghapus artikel knowledge dan file thumbnail terkait
     */
    public function destroy(Article $article)
    {
        if ($article->thumbnail && File::exists(public_path($article->thumbnail))) {
            File::delete(public_path($article->thumbnail));
        }

        $article->delete();

        return redirect()->to('/admin?tab=news')->with('success', 'Artikel berhasil dihapus!');
    }
}