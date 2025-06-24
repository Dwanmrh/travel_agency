<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Offer;
use Carbon\Carbon;
use Exception;

class OffersController extends Controller
{
    public function index()
    {
        try {
            $offers = Offer::orderBy('available', 'DESC')->get();
            return response()->json($offers);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json(['error' => 'Failed to fetch offers'], 500);
        }
    }

    public function store(Request $request)
    {
        $formValues = $request->validate([
            'continent' => 'required',
            'country' => 'required',
            'city' => 'required',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date',
            'transport' => 'required',
            'apartment' => 'required',
            'apartment_name' => 'required',
            'accomodation' => 'required',
            'stars' => 'required|integer|min:1|max:5',
            'price' => 'required|numeric',
            'has_internet' => 'required|boolean',
            'has_tv' => 'required|boolean',
            'has_ac' => 'required|boolean',
            'has_fridge' => 'required|boolean',
            'destination_image' => 'required|image',
            'available' => 'required|boolean',
        ]);

        $departure_time = strtotime($formValues['departure_time']);
        $arrival_time = strtotime($formValues['arrival_time']);
        $monthName = date('F', $departure_time);
        $year = date('Y', $departure_time);

        $formValues['offer_name'] = $formValues['city'] . ", " . $monthName . " " . $year;
        $formValues['num_of_days'] = abs(round(($arrival_time - $departure_time) / 86400));

        // Upload image ke frontend/public/cityImages/
        if ($request->hasFile('destination_image')) {
            $image = $request->file('destination_image');
            $imageName = strtolower($formValues['city']) . '.' . $image->getClientOriginalExtension();

            $destinationPath = base_path('../frontend/public/cityImages');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $image->move($destinationPath, $imageName);

            // Simpan hanya nama file (tanpa path storage/)
            $formValues['destination_image'] = $imageName;
        } else {
            return response()->json(['error' => 'Image upload failed'], 422);
        }

        Offer::create($formValues);
        return response()->json(['message' => 'Offer created successfully']);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'offer_name' => 'required',
            'continent' => 'required',
            'country' => 'required',
            'city' => 'required',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date',
            'transport' => 'required',
            'apartment' => 'required',
            'apartment_name' => 'required',
            'accomodation' => 'required',
            'stars' => 'required|integer|min:1|max:5',
            'price' => 'required|numeric',
            'has_internet' => 'required|boolean',
            'has_tv' => 'required|boolean',
            'has_ac' => 'required|boolean',
            'has_fridge' => 'required|boolean',
            'destination_image' => 'required|string',
        ]);

        $departure_time = strtotime($data['departure_time']);
        $arrival_time = strtotime($data['arrival_time']);
        $monthName = date('F', $departure_time);
        $year = date('Y', $departure_time);

        $data['offer_name'] = $data['city'] . ", " . $monthName . " " . $year;
        $data['num_of_days'] = abs(round(($arrival_time - $departure_time) / 86400));

        $offer = Offer::findOrFail($id);
        $offer->update($data);

        return response()->json(['message' => 'Offer updated successfully']);
    }

    public function destroy($id)
    {
        $offer = Offer::findOrFail($id);
        $offer->delete();
        return response()->json(['message' => 'Successfully deleted offer']);
    }

    public function search(Request $request)
    {
        $offers = Offer::query()
            ->when($request->city, function ($query, $city) {
                $query->where('city', 'like', '%' . $city . '%');
            })
            ->when($request->continent, function ($query, $continent) {
                $query->where('continent', 'like', '%' . $continent . '%');
            })
            ->when($request->country, function ($query, $country) {
                $query->where('country', 'like', '%' . $country . '%');
            })
            ->when($request->transport, function ($query, $transport) {
                $query->where('transport', 'like', '%' . $transport . '%');
            })
            ->when($request->departure_time, function ($query, $date) {
                $query->whereDate('departure_time', '>=', Carbon::parse($date));
            })
            ->when($request->arrival_time, function ($query, $date) {
                $query->whereDate('arrival_time', '<=', Carbon::parse($date));
            })
            ->paginate($request->get('limit', 10));

        return response()->json($offers);
    }
}
