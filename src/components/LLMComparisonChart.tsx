import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LLMData {
  model: string;
  mentions: number;
  position: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface LLMComparisonChartProps {
  data: LLMData[];
}

const modelColors = {
  'ChatGPT': '#10B981',
  'Perplexity': '#8B5CF6', 
  'Claude': '#F59E0B',
  'Gemini': '#EF4444',
  'DeepSeek': '#3B82F6'
};

export const LLMComparisonChart = ({ data }: LLMComparisonChartProps) => {
  return (
    <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Menciones de Marca por LLM</CardTitle>
        <CardDescription>
          Compara la presencia de tu marca en diferentes modelos de IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="model" 
              stroke="hsl(var(--foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="mentions" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={modelColors[entry.model as keyof typeof modelColors] || 'hsl(var(--primary))'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {data.map((item) => (
            <div key={item.model} className="text-center">
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ 
                  backgroundColor: `${modelColors[item.model as keyof typeof modelColors]}20`,
                  color: modelColors[item.model as keyof typeof modelColors] || 'hsl(var(--primary))'
                }}
              >
                #{item.position}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{item.model}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};