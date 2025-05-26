import './App.css';
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Stack
} from "@mui/material";

function App() {
  const [fone, setFone] = useState("");
  const [versao, setVersao] = useState("");
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async () => {
    setLoading(true);   // Ativa o carregamento
    setErro("");        // Limpa erro anterior
    setDados(null);     // Limpa dados anteriores

    try {
      const response = await fetch(
        "https://orionbr.cevalogistics.com/wcf/milkrun/Servicos/SincronizarService.svc/Sincronizar",
        {
          method: "POST",
          headers: {
            fone: fone,
            versao: versao,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro na requisição");  // Caso erro HTTP
      }

      const result = await response.json();   // Converte o retorno pra JSON
      setDados(result.SincronizarResult);     // Salva os dados no estado
    }
    catch (error) {
      setErro(error.message); // Se der erro, salva mensagem
    }
    finally {
      setLoading(false);  // Desliga o carregamento
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align='center'>
        Consulta de Dados
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Fone"
          value={fone}
          onChange={(e) => setFone(e.target.value)}
        />
        <TextField
          label="Versão"
          value={versao}
          onChange={(e) => setVersao(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={loading} sx={{ boxShadow: 3 }}>
          {loading ? <CircularProgress size={24} /> : "Buscar"}
        </Button>
      </Box>

      {erro && (
        <Typography color="error" gutterBottom>
          {erro}
        </Typography>
      )}

      {dados && (
        <Box>
          {/* Card de Informações */}
          <Card sx={{ mb: 3, border: '2px solid #f5f5f5', borderRadius: 2, backgroundColor: '#fefefe' }}>
            <CardContent>
              <Stack spacing={1.2}>
                <Typography variant="h6" gutterBottom>Informações da Viagem</Typography>
                <Typography>Data Viagem: {dados.DataViagem}</Typography>
                <Typography>Número Viagem: {dados.NumeroViagem}</Typography>
                <Typography>Rota: {dados.Rota.trim()}</Typography>
                <Typography>Ponto Operacional: {dados.PontoOperacional}</Typography>
                <Typography>Placa Cavalo: {dados.PlacaCavalo}</Typography>
                <Typography>Placa Carreta 1: {dados.PlacaCarreta1}</Typography>
                <Typography>Placa Carreta 2: {dados.PlacaCarreta2}</Typography>
                <Typography>Manifestar: {dados.Manifestar}</Typography>
                <Typography>Plano: {dados.Plano}</Typography>
                <Typography>Tipo Viagem: {dados.TipoViagem}</Typography>
                <Typography>Status: {dados.Status}</Typography>
                <Typography>Imei: {dados.Imei}</Typography>
                <Typography>Número Fone: {dados.NumeroFone}</Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Tabela Fornecedores */}
          <Typography variant="h6" gutterBottom>
            Fornecedores
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mb: 3 }}>
            <Table sx={{ minWidth: 850 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Código Geral</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>CNPJ</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Razão Social</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Endereço</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Descrição Parada</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ordem Parada</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Cutoff</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dados.Fornecedores.map((f, index) => (
                  <TableRow key={index}>
                    <TableCell>{f.codigoGeral}</TableCell>
                    <TableCell>{f.cnpj}</TableCell>
                    <TableCell>{f.razaoSocial}</TableCell>
                    <TableCell>{f.endereco}</TableCell>
                    <TableCell>{f.descricaoParada}</TableCell>
                    <TableCell>{f.ordemParada}</TableCell>
                    <TableCell>{f.cutoff}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabela Placas */}
          <Typography variant="h6" gutterBottom>
            Placas
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mb: 3 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Placa</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dados.Placas.map((p, index) => (
                  <TableRow key={index}>
                    <TableCell>{p.placa}</TableCell>
                    <TableCell>{p.tipo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabela Plantas */}
          <Typography variant="h6" gutterBottom>
            Plantas
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>CNPJ</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dados.plantas.map((p, index) => (
                  <TableRow key={index}>
                    <TableCell>{p.codigo}</TableCell>
                    <TableCell>{p.cnpj}</TableCell>
                    <TableCell>{p.descricao}</TableCell>
                    <TableCell>{p.resp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default App;
