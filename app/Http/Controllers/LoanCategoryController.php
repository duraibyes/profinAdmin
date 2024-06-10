<?php

namespace App\Http\Controllers;

use App\Models\LoanCategory;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Support\Str;

class LoanCategoryController extends Controller {
    public function index(Request $request): InertiaResponse {
        $query = LoanCategory::query();

        if ($request->has('query')) {
            $search = $request->input('query');
            $query->where('name', 'like', '%' . $search . '%');
        }

        $pageSize = $request->input('size', 10);
        $data = $query->paginate($pageSize)->appends($request->all());

        return Inertia::render('LoanCategory/Index', [
            'category' => $data,
            'filters' => $request->only(['query', 'size']),
        ]);
    }

    public function add( LoanCategory $loanCategory = null ): InertiaResponse {
        return Inertia::render( 'LoanCategory/AddForm', [
            'loanCategory' => $loanCategory
        ] );
    }

    public function store( Request $request, LoanCategory $loanCategory = null ): RedirectResponse {

        $uniqueRule = 'unique:loan_categories,name';

        if ( $loanCategory ) {
            $uniqueRule .= ',' . $loanCategory->id;
        }

        $validated = $request->validate( [
            'name' => 'required|string|max:255|' . $uniqueRule,
            'description' => 'nullable|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ] );

        $data = [
            'name' => $validated[ 'name' ],
            'description' => $validated[ 'description' ] ?? '',
            'slug' => Str::slug( $validated[ 'name' ] ),
            'created_by' => auth()->id(),
        ];

        if ( $request->hasFile( 'icon' ) ) {
            $iconPath = $request->file( 'icon' )->store( 'icons', 'public' );
            $data[ 'icon' ] = $iconPath;
        }

        LoanCategory::updateOrCreate(
            [ 'id' => $loanCategory ? $loanCategory->id : null ],
            $data
        );

        return redirect( route( 'loan-category.index' ) );
    }

    public function updateStatus( LoanCategory $loanCategory ) {

        $loanCategory->status = $loanCategory->status === 'active' ? 'inactive' : 'active';
        $loanCategory->save();
        return redirect()->route( 'loan-category.index' );
    }

    public function destroy( LoanCategory $loanCategory ) {
        $loanCategory->delete();
        return redirect( route( 'loan-category.index' ) );
    }
}
