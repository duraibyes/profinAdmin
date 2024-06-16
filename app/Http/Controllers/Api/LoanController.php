<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\LoanCategory;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    public function getLoanCategoryList(Request $request)
    {
        $data = LoanCategory::where('status', 'active')->get();
        return response()->json(['data' => $data] );
    }

    public function getLoanCategoryInfo($slug)
    {
        info( ' slug', [$slug]);
        $info = LoanCategory::where('slug', $slug)->first();
        return response()->json(['info' => $info] );
    }

    public function SubmitLoanInformation(Request $request) {
        info( 'request all ', $request->all());
        info('aith', [auth()->id()]);
        $loanCategoryId = $request->id;

        $ins = [
            'user_id' => auth()->id(),
            'loan_category_id' => $loanCategoryId,
            'company_type' => '',
            'company_name' => $request->company ?? null,
            'year_of_establishment' => $request->yearEstablish ?? null,
            'annual_term_over' => '',
            'profession_name' => '',
            'no_of_years_profession' => '',
            'employer_name' => '',
            'monthly_salary_range' => '',
            'have_other_loans' => 'no',
            'other_loan_emi' => '',
            'other_loan_emi_amount' => 0,
            'employment_type' => '',
            'monthly_salary' => 0,
            'total_work_experience' => '',
            'property_type' => '',
            'machinery_type' => '',
            'loan_amount' => $request->loanAmount,
            'name' => $request->name,
            'email_id' => $request->email,
            'contact_no' => $request->mobileNo,
            'whatsapp_no' => $request->whatsappNo,
            'alternative_no' => $request->alterNo,
            'status' => 'new',
            // 'mail_sent' => '',
        ];

        Loan::create($ins);
        return response()->json(['error' => 0, 'message' => 'Request Has Been sent, Our Customer care will contact.'] );
    }
}
