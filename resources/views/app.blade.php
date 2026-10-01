<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Leaflet CSS -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />

        <!-- Leaflet JS CDN -->
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

        <!-- CSS untuk Menyembunyikan Bar Atas Google Translate secara Total -->
        <style>
            html {
                top: 0 !important;
            }
            body {
                top: 0 !important;
                position: static !important;
            }
            .goog-te-banner-frame, 
            iframe.goog-te-banner-frame, 
            .skiptranslate, 
            #goog-gt-tt, 
            .goog-te-balloon-frame {
                display: none !important;
                visibility: hidden !important;
            }
            .goog-text-highlight {
                background-color: transparent !important;
                box-shadow: none !important;
            }
        </style>

        <!-- Elemen Wajib Google Translate (Disembunyikan dengan CSS) -->
        <div id="google_translate_element" style="display: none;"></div>

        <!-- Script Resmi Google Translate -->
        <script type="text/javascript">
            function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                    pageLanguage: 'id',
                    includedLanguages: 'id,en',
                    autoDisplay: false
                }, 'google_translate_element');
            }
        </script>
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-white text-slate-800">
        @inertia
    </body>
</html>