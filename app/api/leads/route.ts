import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Interface para os dados do lead
interface LeadData {
  name: string
  email: string
  phone: string
  planName: string
  planPrice: string
  timestamp: string
  userAgent?: string
  referer?: string
  ip?: string
}

// Caminho para o arquivo de leads
const LEADS_FILE = path.join(process.cwd(), "data", "leads.json")

// Função para garantir que o diretório existe
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Função para ler leads existentes
async function readLeads(): Promise<LeadData[]> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(LEADS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // Se o arquivo não existe, retorna array vazio
    return []
  }
}

// Função para salvar leads
async function saveLeads(leads: LeadData[]): Promise<void> {
  await ensureDataDirectory()
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8")
}

export async function POST(request: NextRequest) {
  try {
    // Parse do body da requisição
    const body = await request.json()
    const { name, email, phone, planName, planPrice } = body

    // Validação básica
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Validação de telefone (10 ou 11 dígitos)
    const cleanPhone = phone.replace(/\D/g, "")
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return NextResponse.json({ error: "Telefone inválido" }, { status: 400 })
    }

    // Dados do lead com metadata
    const leadData: LeadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      planName: planName || "Não especificado",
      planPrice: planPrice || "Não especificado",
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
      referer: request.headers.get("referer") || undefined,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
    }

    // Ler leads existentes
    const leads = await readLeads()

    // Verificar se o email ou telefone já existe (BLOQUEIO DE DUPLICATAS)
    const duplicateEmail = leads.find((lead) => lead.email === leadData.email)
    const duplicatePhone = leads.find((lead) => lead.phone === leadData.phone)

    if (duplicateEmail) {
      console.log("⚠️ Email duplicado bloqueado:", leadData.email)
      return NextResponse.json(
        {
          error: "Este email já está cadastrado",
          field: "email",
          duplicate: true,
        },
        { status: 409 },
      )
    }

    if (duplicatePhone) {
      console.log("⚠️ Telefone duplicado bloqueado:", leadData.phone)
      return NextResponse.json(
        {
          error: "Este telefone já está cadastrado",
          field: "phone",
          duplicate: true,
        },
        { status: 409 },
      )
    }

    // Adicionar novo lead
    leads.push(leadData)

    // Salvar no arquivo
    await saveLeads(leads)

    // Log no console (útil para desenvolvimento)
    console.log("✅ Novo lead capturado:", {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      planName: leadData.planName,
      timestamp: leadData.timestamp,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Lead salvo com sucesso",
        leadId: leads.length,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Erro ao salvar lead:", error)
    return NextResponse.json(
      {
        error: "Erro interno ao salvar lead",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

// GET - Para listar leads (opcional - use com cuidado em produção)
export async function GET(request: NextRequest) {
  try {
    // Verificar se tem autorização (você pode adicionar um token secreto)
    const authHeader = request.headers.get("authorization")
    const SECRET_TOKEN = process.env.LEADS_ACCESS_TOKEN || "seu-token-secreto"

    if (authHeader !== `Bearer ${SECRET_TOKEN}`) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const leads = await readLeads()

    return NextResponse.json(
      {
        success: true,
        total: leads.length,
        leads: leads,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Erro ao ler leads:", error)
    return NextResponse.json(
      {
        error: "Erro ao ler leads",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
