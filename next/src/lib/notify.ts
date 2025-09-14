export async function notifyProposalApproved(params: {
  webhookUrl?: string
  proposalId: string
  projectId: string
  title: string
  totalCents: number
}) {
  const { webhookUrl, ...payload } = params
  if (!webhookUrl) return
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ event: 'proposal.approved', ...payload }),
    })
  } catch {
    // best-effort only
  }
}

