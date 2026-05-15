import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {

    const { data, error } = await supabase
        .from('FeatureBenefits')
        .select(`
            benefit_id,
            house_id,
            benefit_name,
            created_at
        `)

    if (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }

    return NextResponse.json({
        success: true,
        total: data.length,
        data: data
    })
}