import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const house_name = searchParams.get('house_name')

    let query = supabase
        .from('Houses')
        .select(`
            house_id,
            house_name,
            house_type,
            category,
            block,
            price,
            land_area,
            building_area,
            bedroom,
            bathroom,
            living_room,
            kitchen,
            carport,
            sanitation,
            electricity,
            water_source,
            description
        `)

    if (house_name) {
        query = query.eq('house_name', house_name)
    }

    const { data, error } = await query

    if (error) {
        return NextResponse.json({ success: false, error: error.message })
    }

    return NextResponse.json({
        success: true,
        total: data.length,
        data: data
    })
}