import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions, IconButton, Tabs, Tab,
  Switch, FormControlLabel
} from '@mui/material';
import { IconPlus, IconEdit, IconTrash, IconShield, IconUser, IconKey } from '@tabler/icons-react';
import PageContainer from '../../../../modernize-dashboard/src/components/container/PageContainer';

const AuthMain = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', email: 'admin@webmonk.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-20 10:30', permissions: ['all'] },
    { id: 2, username: 'manager1', email: 'manager@webmonk.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-19 15:45', permissions: ['crm', 'sales', 'projects'] },
    { id: 3, username: 'staff1', email: 'staff@webmonk.com', role: 'Staff', status: 'Inactive', lastLogin: '2024-01-18 09:15', permissions: ['tasks', 'crm'] }
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', description: 'Full system access', permissions: ['all'], userCount: 1 },
    { id: 2, name: 'Manager', description: 'Department management', permissions: ['crm', 'sales', 'projects', 'hr'], userCount: 3 },
    { id: 3, name: 'Staff', description: 'Basic operations', permissions: ['tasks', 'crm'], userCount: 8 }
  ]);

  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', role: 'Staff', status: 'Active' });

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData(item);
    setOpen(true);
  };

  const handleSave = () => {
    if (activeTab === 0) {
      if (editItem) {
        setUsers(users.map(u => u.id === editItem.id ? { ...formData, id: editItem.id } : u));
      } else {
        setUsers([...users, { ...formData, id: Date.now(), lastLogin: 'Never', permissions: [] }]);
      }
    } else {
      if (editItem) {
        setRoles(roles.map(r => r.id === editItem.id ? { ...formData, id: editItem.id } : r));
      } else {
        setRoles([...roles, { ...formData, id: Date.now(), userCount: 0 }]);
      }
    }
    setOpen(false);
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ));
  };

  const UsersTab = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Login</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}>
              <TableCell sx={{ fontWeight: 'medium' }}>{user.username}</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>{user.email}</TableCell>
              <TableCell>
                <Chip label={user.role} color={user.role === 'Admin' ? 'error' : user.role === 'Manager' ? 'warning' : 'default'} size="small" />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={user.status === 'Active'} 
                      onChange={() => toggleUserStatus(user.id)}
                      size="small"
                    />
                  }
                  label={user.status}
                />
              </TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>{user.lastLogin}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(user)} size="small">
                  <IconEdit />
                </IconButton>
                <IconButton size="small" color="primary">
                  <IconKey />
                </IconButton>
                <IconButton size="small" color="error">
                  <IconTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const RolesTab = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role Name</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Permissions</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Users</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow key={role.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}>
              <TableCell sx={{ fontWeight: 'medium' }}>{role.name}</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>{role.description}</TableCell>
              <TableCell>
                <Box display="flex" gap={0.5} flexWrap="wrap">
                  {role.permissions.slice(0, 3).map(perm => (
                    <Chip key={perm} label={perm} size="small" variant="outlined" />
                  ))}
                  {role.permissions.length > 3 && (
                    <Chip label={`+${role.permissions.length - 3}`} size="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>{role.userCount}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(role)} size="small">
                  <IconEdit />
                </IconButton>
                <IconButton size="small" color="error">
                  <IconTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <PageContainer title="Authentication" description="User & Role Management">
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Authentication Management</Typography>
          <Button variant="contained" startIcon={<IconPlus />} onClick={() => setOpen(true)}>
            {activeTab === 0 ? 'Add User' : 'Add Role'}
          </Button>
        </Box>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconUser />
                  <Typography variant="h6">Total Users</Typography>
                </Box>
                <Typography variant="h4" color="primary">{users.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconShield />
                  <Typography variant="h6">Active Users</Typography>
                </Box>
                <Typography variant="h4" color="success.main">
                  {users.filter(u => u.status === 'Active').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Roles</Typography>
                <Typography variant="h4" color="info.main">{roles.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Admin Users</Typography>
                <Typography variant="h4" color="error.main">
                  {users.filter(u => u.role === 'Admin').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab label="Users" />
              <Tab label="Roles & Permissions" />
            </Tabs>
          </Box>
          <CardContent>
            {activeTab === 0 && <UsersTab />}
            {activeTab === 1 && <RolesTab />}
          </CardContent>
        </Card>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>{editItem ? `Edit ${activeTab === 0 ? 'User' : 'Role'}` : `New ${activeTab === 0 ? 'User' : 'Role'}`}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {activeTab === 0 ? (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Role"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      margin="normal"
                      SelectProps={{ native: true }}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Status"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      margin="normal"
                      SelectProps={{ native: true }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </TextField>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Role Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      margin="normal"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default AuthMain;